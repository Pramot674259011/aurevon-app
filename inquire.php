<?php
require __DIR__ . '/includes/functions.php';
$page = 'inquire';
$pageTitle = 'Inquire';
$error = '';
$submitted = false;
$name = '';
$email = '';
$message = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim((string) ($_POST['name'] ?? ''));
    $email = trim((string) ($_POST['email'] ?? ''));
    $message = trim((string) ($_POST['message'] ?? ''));

    if ($name === '' || $email === '') {
        $error = 'Enter your name and email first';
    } else {
        $data = aurevon_read_data();
        $data['inquiries'][] = [
            'name' => $name,
            'email' => $email,
            'message' => $message,
            'created_at' => date('c'),
        ];
        aurevon_write_data($data);
        $submitted = true;
    }
}

require __DIR__ . '/includes/header.php';
?>

<main class="page-section">
    <div class="page-content form-wrap">
        <h1 class="page-title">Inquire</h1>
        <p class="form-intro">Reach out about a piece, a private viewing, or joining the waitlist.</p>

        <?php if ($submitted): ?>
            <div class="confirm-box">
                <p>Thank you, <span class="strong"><?= aurevon_escape($name) ?></span>. We'll be in touch at <span
                        class="strong"><?= aurevon_escape($email) ?></span>.</p>
            </div>
        <?php else: ?>
            <form method="post" action="inquire.php" class="form-grid" novalidate>
                <div class="field">
                    <label for="name">Name</label>
                    <input class="input" type="text" id="name" name="name" value="<?= aurevon_escape($name) ?>" />
                </div>

                <div class="field">
                    <label for="email">Email</label>
                    <input class="input" type="email" id="email" name="email" value="<?= aurevon_escape($email) ?>" />
                </div>

                <div class="field">
                    <label for="message">Message</label>
                    <textarea class="textarea" id="message" name="message"><?= aurevon_escape($message) ?></textarea>
                </div>

                <?php if ($error !== ''): ?>
                    <p class="form-error"><?= aurevon_escape($error) ?></p>
                <?php endif; ?>

                <div class="form-actions">
                    <button type="submit" class="primary-button">Send inquiry</button>
                </div>
            </form>
        <?php endif; ?>
    </div>
</main>

<?php require __DIR__ . '/includes/footer.php'; ?>