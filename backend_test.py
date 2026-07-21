#!/usr/bin/env python3
"""
Backend API Test Suite for Abr Al Awtan Logistics
Tests all endpoints at REACT_APP_BACKEND_URL/api
"""
import requests
import json
import sys
from typing import Dict, Any, Optional

# Base URL from frontend/.env
BASE_URL = "https://delivery-nexus-42.preview.emergentagent.com/api"

class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    RESET = '\033[0m'

def log_test(test_num: int, description: str):
    print(f"\n{Colors.BLUE}[TEST {test_num}]{Colors.RESET} {description}")

def log_success(message: str):
    print(f"{Colors.GREEN}✓ {message}{Colors.RESET}")

def log_error(message: str):
    print(f"{Colors.RED}✗ {message}{Colors.RESET}")

def log_warning(message: str):
    print(f"{Colors.YELLOW}⚠ {message}{Colors.RESET}")

def make_request(method: str, endpoint: str, data: Optional[Dict] = None, expected_status: int = 200) -> tuple[bool, Any]:
    """Make HTTP request and validate response"""
    url = f"{BASE_URL}{endpoint}"
    try:
        if method == "GET":
            response = requests.get(url, timeout=10)
        elif method == "POST":
            response = requests.post(url, json=data, timeout=10)
        else:
            log_error(f"Unsupported method: {method}")
            return False, None
        
        if response.status_code != expected_status:
            log_error(f"Expected status {expected_status}, got {response.status_code}")
            log_error(f"Response: {response.text[:500]}")
            return False, None
        
        try:
            return True, response.json()
        except:
            log_error("Response is not valid JSON")
            log_error(f"Response text: {response.text[:500]}")
            return False, None
    except requests.exceptions.Timeout:
        log_error(f"Request timeout for {url}")
        return False, None
    except requests.exceptions.ConnectionError:
        log_error(f"Connection error for {url}")
        return False, None
    except Exception as e:
        log_error(f"Request failed: {str(e)}")
        return False, None

def test_1_root_endpoint():
    """Test 1: GET /api/ → should return service info"""
    log_test(1, "Testing root endpoint GET /api/")
    success, data = make_request("GET", "/")
    
    if not success:
        return False
    
    if data.get("service") == "Abr Al Awtan API" and data.get("status") == "live":
        log_success(f"Root endpoint working: {json.dumps(data, indent=2)}")
        return True
    else:
        log_error(f"Unexpected response structure: {data}")
        return False

def test_2_create_quote():
    """Test 2: POST /api/quotes → should create quote and return ID"""
    log_test(2, "Testing POST /api/quotes")
    
    payload = {
        "services": ["Custom Clearance", "Linehaul"],
        "company": "Test Corp",
        "contact": "John",
        "email": "john@test.com",
        "phone": "+966501112233",
        "regions": "Central",
        "volume": "10k - 50k",
        "timeline": "Immediate",
        "notes": "test"
    }
    
    success, data = make_request("POST", "/quotes", payload)
    
    if not success:
        return False
    
    if data.get("id") and data.get("status") == "received":
        log_success(f"Quote created: ID={data.get('id')}, status={data.get('status')}")
        return True
    else:
        log_error(f"Missing id or status in response: {data}")
        return False

def test_3_create_shipment():
    """Test 3: POST /api/shipments → should create shipment and return tracking_id"""
    log_test(3, "Testing POST /api/shipments")
    
    payload = {
        "sender_name": "Ahmed Al-Rashid",
        "sender_phone": "+966501234567",
        "sender_city": "Riyadh",
        "sender_address": "King Fahd Road, Al Olaya District",
        "recipient_name": "Fatima Al-Zahrani",
        "recipient_phone": "+966509876543",
        "recipient_city": "Jeddah",
        "recipient_address": "Tahlia Street, Al Zahra District",
        "package_type": "parcel",
        "weight_kg": 5,
        "pieces": 1,
        "service_level": "next_day",
        "payment_mode": "prepaid"
    }
    
    success, data = make_request("POST", "/shipments", payload)
    
    if not success:
        return False
    
    tracking_id = data.get("tracking_id")
    eta_hours = data.get("eta_hours")
    
    if tracking_id and eta_hours:
        log_success(f"Shipment created: tracking_id={tracking_id}, eta_hours={eta_hours}")
        # Store tracking_id for test 5
        global created_tracking_id
        created_tracking_id = tracking_id
        return True
    else:
        log_error(f"Missing tracking_id or eta_hours in response: {data}")
        return False

def test_4_track_demo_shipment():
    """Test 4: GET /api/track/AAW-48291736 → should return demo shipment"""
    log_test(4, "Testing GET /api/track/AAW-48291736 (demo shipment)")
    
    success, data = make_request("GET", "/track/AAW-48291736")
    
    if not success:
        return False
    
    if data.get("tracking_id") == "AAW-48291736" and "events" in data and isinstance(data["events"], list):
        log_success(f"Demo shipment found: {data.get('tracking_id')}, status={data.get('status')}, events count={len(data['events'])}")
        return True
    else:
        log_error(f"Demo shipment not found or missing events array: {data}")
        return False

def test_5_track_created_shipment():
    """Test 5: GET /api/track/{tracking_id} → should return shipment from test 3"""
    log_test(5, f"Testing GET /api/track/{created_tracking_id} (created in test 3)")
    
    if not created_tracking_id:
        log_error("No tracking_id from test 3")
        return False
    
    success, data = make_request("GET", f"/track/{created_tracking_id}")
    
    if not success:
        return False
    
    if data.get("tracking_id") == created_tracking_id:
        log_success(f"Created shipment tracked: {data.get('tracking_id')}, status={data.get('status')}")
        return True
    else:
        log_error(f"Tracking ID mismatch or not found: {data}")
        return False

def test_6_calculate_rate():
    """Test 6: POST /api/rate → should return rate calculation"""
    log_test(6, "Testing POST /api/rate")
    
    payload = {
        "origin_city": "Riyadh",
        "destination_city": "Jeddah",
        "weight_kg": 5,
        "pieces": 1,
        "service_level": "next_day",
        "package_type": "parcel"
    }
    
    success, data = make_request("POST", "/rate", payload)
    
    if not success:
        return False
    
    required_fields = ["total", "vat", "breakdown", "eta"]
    missing = [f for f in required_fields if f not in data]
    
    if not missing:
        log_success(f"Rate calculated: total={data.get('total')} SAR, vat={data.get('vat')}, eta={data.get('eta')}")
        return True
    else:
        log_error(f"Missing fields in response: {missing}")
        log_error(f"Response: {data}")
        return False

def test_7_submit_contact():
    """Test 7: POST /api/contact → should submit contact form"""
    log_test(7, "Testing POST /api/contact")
    
    payload = {
        "name": "Khalid Al-Mutairi",
        "email": "khalid@example.com",
        "message": "I need information about your warehousing services in Riyadh."
    }
    
    success, data = make_request("POST", "/contact", payload)
    
    if not success:
        return False
    
    if data.get("ok") is True and data.get("id"):
        log_success(f"Contact form submitted: id={data.get('id')}")
        return True
    else:
        log_error(f"Missing ok=true or id in response: {data}")
        return False

def test_8_list_jobs():
    """Test 8: GET /api/jobs → should return 6 jobs"""
    log_test(8, "Testing GET /api/jobs")
    
    success, data = make_request("GET", "/jobs")
    
    if not success:
        return False
    
    jobs = data.get("jobs", [])
    if isinstance(jobs, list) and len(jobs) == 6:
        log_success(f"Jobs list retrieved: {len(jobs)} jobs")
        for job in jobs[:2]:  # Show first 2
            log_success(f"  - {job.get('title')} ({job.get('location')})")
        return True
    else:
        log_error(f"Expected 6 jobs, got {len(jobs) if isinstance(jobs, list) else 'invalid'}")
        return False

def test_9_submit_career_application():
    """Test 9: POST /api/careers → should submit application"""
    log_test(9, "Testing POST /api/careers")
    
    payload = {
        "name": "Sara Al-Qahtani",
        "email": "sara.qahtani@example.com",
        "phone": "+966505551234",
        "position": "Warehouse Supervisor",
        "experience_years": 5
    }
    
    success, data = make_request("POST", "/careers", payload)
    
    if not success:
        return False
    
    if data.get("ok") is True:
        log_success(f"Career application submitted: id={data.get('id')}")
        return True
    else:
        log_error(f"Missing ok=true in response: {data}")
        return False

def test_10_list_blog_posts():
    """Test 10: GET /api/blog → should return 4 posts"""
    log_test(10, "Testing GET /api/blog")
    
    success, data = make_request("GET", "/blog")
    
    if not success:
        return False
    
    posts = data.get("posts", [])
    if isinstance(posts, list) and len(posts) == 4:
        log_success(f"Blog posts retrieved: {len(posts)} posts")
        for post in posts[:2]:  # Show first 2
            log_success(f"  - {post.get('title')} by {post.get('author')}")
        return True
    else:
        log_error(f"Expected 4 posts, got {len(posts) if isinstance(posts, list) else 'invalid'}")
        return False

def test_11_get_blog_post():
    """Test 11: GET /api/blog/why-owning-beats-brokering → should return single post"""
    log_test(11, "Testing GET /api/blog/why-owning-beats-brokering")
    
    success, data = make_request("GET", "/blog/why-owning-beats-brokering")
    
    if not success:
        return False
    
    if data.get("slug") == "why-owning-beats-brokering" and data.get("content"):
        log_success(f"Blog post retrieved: {data.get('title')}")
        log_success(f"  Content length: {len(data.get('content', ''))} chars")
        return True
    else:
        log_error(f"Missing slug or content in response: {data}")
        return False

def test_12_subscribe():
    """Test 12: POST /api/subscribe → should subscribe email"""
    log_test(12, "Testing POST /api/subscribe")
    
    payload = {
        "email": "subscriber@example.com"
    }
    
    success, data = make_request("POST", "/subscribe", payload)
    
    if not success:
        return False
    
    if data.get("ok") is True:
        log_success("Email subscribed successfully")
        return True
    else:
        log_error(f"Missing ok=true in response: {data}")
        return False

def test_13_chat_single_turn():
    """Test 13: POST /api/chat → should get LLM response"""
    log_test(13, "Testing POST /api/chat (single turn - LLM integration)")
    
    payload = {
        "session_id": "test-session-1",
        "message": "What services do you offer?"
    }
    
    success, data = make_request("POST", "/chat", payload)
    
    if not success:
        return False
    
    session_id = data.get("session_id")
    reply = data.get("reply", "")
    
    if not session_id or not reply:
        log_error(f"Missing session_id or reply: {data}")
        return False
    
    # Check if it's a real LLM response (not fallback error message)
    fallback_indicators = [
        "temporarily unavailable",
        "WhatsApp at +966 50 000 0000",
        "hit a hiccup"
    ]
    
    is_fallback = any(indicator in reply for indicator in fallback_indicators)
    
    if is_fallback:
        log_error("❌ CRITICAL: Chat returned fallback error message, not real LLM response")
        log_error(f"Reply: {reply[:200]}")
        return False
    
    # Check if reply mentions company services (indicates real LLM response)
    service_keywords = ["warehouse", "fleet", "ZATCA", "clearance", "logistics", "delivery", "shipment", "service"]
    has_service_mention = any(keyword.lower() in reply.lower() for keyword in service_keywords)
    
    if has_service_mention and len(reply) > 50:
        log_success(f"✓ LLM chat working! Reply length: {len(reply)} chars")
        log_success(f"Reply preview: {reply[:150]}...")
        return True
    else:
        log_warning(f"Reply seems short or generic: {reply[:200]}")
        log_warning("This might not be a proper LLM response")
        return False

def test_14_chat_multi_turn():
    """Test 14: POST /api/chat (multi-turn) + GET /api/chat/{session_id}"""
    log_test(14, "Testing POST /api/chat (multi-turn) + GET conversation history")
    
    # Second message in same session
    payload = {
        "session_id": "test-session-1",
        "message": "What's your coverage?"
    }
    
    success, data = make_request("POST", "/chat", payload)
    
    if not success:
        return False
    
    reply = data.get("reply", "")
    
    # Check if it's a real LLM response
    fallback_indicators = [
        "temporarily unavailable",
        "WhatsApp at +966 50 000 0000",
        "hit a hiccup"
    ]
    
    is_fallback = any(indicator in reply for indicator in fallback_indicators)
    
    if is_fallback:
        log_error("❌ CRITICAL: Multi-turn chat returned fallback error message")
        log_error(f"Reply: {reply[:200]}")
        return False
    
    log_success(f"Multi-turn reply received: {reply[:100]}...")
    
    # Now get conversation history
    log_test(14.1, "Testing GET /api/chat/test-session-1 (conversation history)")
    success, history_data = make_request("GET", "/chat/test-session-1")
    
    if not success:
        return False
    
    messages = history_data.get("messages", [])
    
    if len(messages) >= 4:  # At least 2 user + 2 assistant messages
        log_success(f"Conversation history retrieved: {len(messages)} messages")
        user_msgs = [m for m in messages if m.get("role") == "user"]
        assistant_msgs = [m for m in messages if m.get("role") == "assistant"]
        log_success(f"  User messages: {len(user_msgs)}, Assistant messages: {len(assistant_msgs)}")
        return True
    else:
        log_error(f"Expected at least 4 messages, got {len(messages)}")
        return False

# Global variable to store tracking_id from test 3
created_tracking_id = None

def main():
    print(f"\n{Colors.BLUE}{'='*70}{Colors.RESET}")
    print(f"{Colors.BLUE}Abr Al Awtan Logistics - Backend API Test Suite{Colors.RESET}")
    print(f"{Colors.BLUE}Base URL: {BASE_URL}{Colors.RESET}")
    print(f"{Colors.BLUE}{'='*70}{Colors.RESET}")
    
    tests = [
        test_1_root_endpoint,
        test_2_create_quote,
        test_3_create_shipment,
        test_4_track_demo_shipment,
        test_5_track_created_shipment,
        test_6_calculate_rate,
        test_7_submit_contact,
        test_8_list_jobs,
        test_9_submit_career_application,
        test_10_list_blog_posts,
        test_11_get_blog_post,
        test_12_subscribe,
        test_13_chat_single_turn,
        test_14_chat_multi_turn
    ]
    
    results = []
    for test_func in tests:
        try:
            result = test_func()
            results.append((test_func.__name__, result))
        except Exception as e:
            log_error(f"Test {test_func.__name__} crashed: {str(e)}")
            results.append((test_func.__name__, False))
    
    # Summary
    print(f"\n{Colors.BLUE}{'='*70}{Colors.RESET}")
    print(f"{Colors.BLUE}TEST SUMMARY{Colors.RESET}")
    print(f"{Colors.BLUE}{'='*70}{Colors.RESET}")
    
    passed = sum(1 for _, result in results if result)
    total = len(results)
    
    for test_name, result in results:
        status = f"{Colors.GREEN}PASS{Colors.RESET}" if result else f"{Colors.RED}FAIL{Colors.RESET}"
        print(f"{status} - {test_name}")
    
    print(f"\n{Colors.BLUE}Total: {passed}/{total} tests passed{Colors.RESET}")
    
    if passed == total:
        print(f"{Colors.GREEN}✓ All tests passed!{Colors.RESET}\n")
        return 0
    else:
        print(f"{Colors.RED}✗ Some tests failed{Colors.RESET}\n")
        return 1

if __name__ == "__main__":
    sys.exit(main())
