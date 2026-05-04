<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'error' => 'Method not allowed.']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$firstName = isset($input['firstName']) ? trim($input['firstName']) : '';
$email     = isset($input['email'])     ? trim($input['email'])     : '';

if (!$firstName || !$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'error' => 'Invalid input.']);
    exit;
}

$apiKey     = 'YOUR_MAILCHIMP_API_KEY';   // e.g. abc123....-us18
$audienceId = 'YOUR_MAILCHIMP_AUDIENCE_ID';
$server     = 'us18';                     // the part after the dash in your API key

$url  = "https://{$server}.api.mailchimp.com/3.0/lists/{$audienceId}/members";
$data = json_encode([
    'email_address' => $email,
    'status'        => 'subscribed',
    'merge_fields'  => ['FNAME' => $firstName],
    'tags'          => ['watchman', 'purelife2030'],
]);

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_USERPWD,        'anystring:' . $apiKey);
curl_setopt($ch, CURLOPT_HTTPHEADER,     ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_POST,           true);
curl_setopt($ch, CURLOPT_POSTFIELDS,     $data);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT,        10);

$response   = curl_exec($ch);
$httpStatus = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

$result = json_decode($response, true);

if ($httpStatus === 200 || $httpStatus === 204) {
    echo json_encode(['success' => true]);
} elseif (isset($result['title']) && $result['title'] === 'Member Exists') {
    echo json_encode(['success' => true]);
} else {
    $errorMsg = isset($result['detail']) ? $result['detail'] : 'Subscription failed. Please try again.';
    echo json_encode(['success' => false, 'error' => $errorMsg]);
}
