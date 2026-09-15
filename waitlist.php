<?php
require __DIR__ . '/includes/functions.php';
$page = 'waitlist';
$pageTitle = 'Join the waitlist';
$error = '';
$submitted = false;
$name = '';
$email = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim((string) ($_POST['name'] ?? ''));
    $email = trim((string) ($_POST['email'] ?? ''));

    if ($email === '') {
        $error = 'Enter your email first';
    } else {
        $data = aurevon_read_data();
        $data['waitlist'][] = [
            'name' => $name,
            'email' => $email,
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
        <h1 class="page-title">Join the waitlist</h1>
        <p class="form-intro">Be first to know when a new piece enters the collection.</p>

        <?php if ($submitted): ?>
            <div class="confirm-box">
                <p>You're on the
                    list<?= $name !== '' ? ', <span class="strong">' . aurevon_escape($name) . '</span>' : '' ?>. We'll
                    email <span class="strong"><?= aurevon_escape($email) ?></span> when something new arrives.</p>
            </div>
        <?php else: ?>
            <form method="post" action="waitlist.php" class="form-grid" novalidate>
                <div class="field">
                    <label for="name">Name (optional)</label>
                    <input class="input" type="text" id="name" name="name" value="<?= aurevon_escape($name) ?>" />
                </div>

                <div class="field">
                    <label for="email">Email</label>
                    <input class="input" type="email" id="email" name="email" value="<?= aurevon_escape($email) ?>" />
                </div>

                <?php if ($error !== ''): ?>
                    <p class="form-error"><?= aurevon_escape($error) ?></p>
                <?php endif; ?>

                <div class="form-actions">
                    <button type="submit" class="primary-button">Join the waitlist</button>
                </div>
            </form>
        <?php endif; ?>
    </div>
</main>

<?php require __DIR__ . '/includes/footer.php'; ?>