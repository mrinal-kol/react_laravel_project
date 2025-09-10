<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{{ config('app.name') }}</title>
    @viteReactRefresh
    @vite('resources/js/app.jsx')
</head>
<body>
    @inertia
</body>
</html>
