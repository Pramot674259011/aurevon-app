<?php
require __DIR__ . '/includes/functions.php';
$page = 'reserve';
$pageTitle = 'Reserve a private viewing';
$data = aurevon_read_data();
$pieces = $data['pieces'] ?? [];
$selectedPiece = isset($_GET['piece']) ? trim((string) $_GET['piece']) : '';
$timeSlots = ['10:00 AM', '11:30 AM', '1:00 PM', '2:30 PM', '4:00 PM'];
$deposit = 50;

$error = '';
$confirmed = false;
$piece = $selectedPiece;
$date = '';
$time = '';
$guests = 1;
$conditionReport = false;
$provenance = false;
$name = '';
$email = '';
$cardNumber = '';
$expiry = '';
$cvc = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $piece = trim((string) ($_POST['piece'] ?? ''));
    $date = trim((string) ($_POST['date'] ?? ''));
    $time = trim((string) ($_POST['time'] ?? ''));
    $guests = max(1, (int) ($_POST['guests'] ?? 1));
    $conditionReport = isset($_POST['condition_report']);
    $provenance = isset($_POST['provenance']);
    $name = trim((string) ($_POST['name'] ?? ''));
    $email = trim((string) ($_POST['email'] ?? ''));
    $cardNumber = trim((string) ($_POST['card_number'] ?? ''));
    $expiry = trim((string) ($_POST['expiry'] ?? ''));
    $cvc = trim((string) ($_POST['cvc'] ?? ''));

    if ($piece === '' || $date === '' || $time === '' || $name === '' || $email === '') {
        $error = 'Fill in the piece, date, time, name and email first';
    } elseif ($cardNumber === '' || $expiry === '' || $cvc === '') {
        $error = 'Card details are needed to hold the deposit';
    } else {
        $data = aurevon_read_data();
        $data['reservations'][] = [
            'piece' => $piece,
            'date' => $date,
            'time' => $time,
            'guests' => $guests,
            'name' => $name,
            'email' => $email,
            'deposit' => $deposit,
            'condition_report' => $conditionReport,
            'provenance' => $provenance,
            'created_at' => date('c'),
        ];
        aurevon_write_data($data);
        $confirmed = true;
    }
}

require __DIR__ . '/includes/header.php';
?>

<main class="page-section">
    <div class="page-content form-wrap">
        <?php if ($confirmed): ?>
            <h1 class="page-title">Viewing confirmed</h1>
            <div class="confirm-box">
                <p><?= aurevon_escape($name) ?>, your private viewing of <span
                        class="strong"><?= aurevon_escape($piece) ?></span> is held for <?= aurevon_escape($date) ?> at
                    <?= aurevon_escape($time) ?> (<?= (int) $guests ?>     <?= ((int) $guests === 1) ? 'guest' : 'guests' ?>). A
                    confirmation has been sent to <?= aurevon_escape($email) ?>.</p>
                <p style="margin-top: 18px; color: rgba(255,255,255,0.5);">The $<?= $deposit ?> deposit holds your slot and
                    is credited toward the piece if you choose to acquire it, or refunded after your visit if you don't.
                    This reserves your time with the work — it isn't a purchase.</p>
            </div>
        <?php else: ?>
            <h1 class="page-title">Reserve a private viewing</h1>
            <p class="form-intro">Spend unhurried time with a piece before deciding anything. A $<?= $deposit ?> deposit
                holds your slot — it's credited toward the work if you acquire it, or refunded after your visit.</p>

            <form method="post" action="reserve.php" class="form-grid" novalidate>
                <div class="field">
                    <label for="piece">Piece</label>
                    <select class="select" id="piece" name="piece">
                        <option value="">Choose a piece</option>
                        <?php foreach ($pieces as $item): ?>
                            <option value="<?= aurevon_escape($item['title']) ?>" <?= $piece === $item['title'] ? 'selected' : '' ?>><?= aurevon_escape($item['title']) ?> — <?= aurevon_escape($item['artist']) ?></option>
                        <?php endforeach; ?>
                    </select>
                </div>

                <div class="field">
                    <div style="display:grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px;">
                        <div>
                            <label for="date">Date</label>
                            <input class="input" type="date" id="date" name="date" value="<?= aurevon_escape($date) ?>" />
                        </div>
                        <div>
                            <label for="time">Time</label>
                            <select class="select" id="time" name="time">
                                <option value="">Select</option>
                                <?php foreach ($timeSlots as $slot): ?>
                                    <option value="<?= aurevon_escape($slot) ?>" <?= $time === $slot ? 'selected' : '' ?>>
                                        <?= aurevon_escape($slot) ?></option>
                                <?php endforeach; ?>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="field">
                    <label for="guests">Guests</label>
                    <input class="input" type="number" id="guests" name="guests" min="1" max="4"
                        value="<?= (int) $guests ?>" />
                </div>

                <div class="field">
                    <div class="checkbox-list">
                        <label class="checkbox-row">
                            <input type="checkbox" name="condition_report" <?= $conditionReport ? 'checked' : '' ?> />
                            Send a condition report beforehand
                        </label>
                        <label class="checkbox-row">
                            <input type="checkbox" name="provenance" <?= $provenance ? 'checked' : '' ?> />
                            Include provenance documents
                        </label>
                    </div>
                </div>

                <div class="field">
                    <label for="name">Name</label>
                    <input class="input" type="text" id="name" name="name" value="<?= aurevon_escape($name) ?>" />
                </div>

                <div class="field">
                    <label for="email">Email</label>
                    <input class="input" type="email" id="email" name="email" value="<?= aurevon_escape($email) ?>" />
                </div>

                <div class="field">
                    <label for="card_number">Card number</label>
                    <input class="input" type="text" id="card_number" name="card_number" placeholder="•••• •••• •••• ••••"
                        value="<?= aurevon_escape($cardNumber) ?>" />
                </div>

                <div class="field">
                    <div style="display:grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px;">
                        <div>
                            <label for="expiry">Expiry</label>
                            <input class="input" type="text" id="expiry" name="expiry" placeholder="MM/YY"
                                value="<?= aurevon_escape($expiry) ?>" />
                        </div>
                        <div>
                            <label for="cvc">CVC</label>
                            <input class="input" type="text" id="cvc" name="cvc" placeholder="•••"
                                value="<?= aurevon_escape($cvc) ?>" />
                        </div>
                    </div>
                </div>

                <?php if ($error !== ''): ?>
                    <p class="form-error"><?= aurevon_escape($error) ?></p>
                <?php endif; ?>

                <div class="form-actions">
                    <button type="submit" class="primary-button">Confirm viewing — $<?= $deposit ?></button>
                </div>
            </form>
        <?php endif; ?>
    </div>
</main>

<?php require __DIR__ . '/includes/footer.php'; ?>