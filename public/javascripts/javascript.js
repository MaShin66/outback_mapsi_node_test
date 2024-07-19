async function logEvent(eventType) {
    await fetch('/events/log', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ eventType })
    });
}

function canAccessIssue() {
    return localStorage.getItem('canAccessIssue') === 'true';
}

function setAccessIssueAllowed() {
    localStorage.setItem('canAccessIssue', 'true');
}

function getCouponCode() {
    return localStorage.getItem('couponCode');
}

function setCouponCode(code) {
    localStorage.setItem('couponCode', code);
}

function clearCouponCode() {
    localStorage.removeItem('couponCode');
}