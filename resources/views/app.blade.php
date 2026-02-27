<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{{ config('app.name') }}</title>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    @viteReactRefresh
    @vite('resources/js/app.jsx')

  
</head>

<body>

    <!-- Header -->
    @include('menu')

    <!-- Body (React pages will load here) -->
    <main class="app-bg">
        @inertia
    </main>

    <!-- Footer -->
    <footer>
        <p>&copy; {{ date('Y') }} {{ config('app.name') }}. All rights reserved.</p>
    </footer>

</body>
</html>
