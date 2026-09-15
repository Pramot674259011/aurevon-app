<?php
require __DIR__ . '/includes/functions.php';
$page = 'home';
require __DIR__ . '/includes/header.php';
?>

<main>
    <section class="hero">
        <video class="hero-video"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260819_212700_3bb9329b-5c50-4257-a09b-ca85cf3654a3.mp4"
            autoplay muted loop playsinline></video>

        <div class="hero-content">
            <h1 class="hero-title">A carefully curated<br />collection beyond compare</h1>
            <p class="hero-subtitle">Reserve your place in our private gallery.</p>
            <a href="waitlist.php" class="button-primary">Join the waitlist</a>
        </div>
    </section>

    <section class="page-section" style="padding-top: 110px; padding-bottom: 110px;">
        <div class="page-content" style="text-align: center; max-width: 780px;">
            <h2 class="page-title" style="font-size: clamp(2.2rem, 4vw, 4rem); margin-bottom: 22px;">An archive of
                quiet, deliberate work</h2>
            <p class="page-copy" style="margin: 0 auto; max-width: 620px; color: rgba(255, 255, 255, 0.6);">
                Every piece in Aurevon passes through a single curator's eye before it reaches the gallery. Fewer works,
                held to a higher standard.
            </p>
        </div>
    </section>
</main>

<?php require __DIR__ . '/includes/footer.php'; ?>