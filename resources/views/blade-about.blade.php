<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Blade About Page</title>
</head>
<body>
    <h1>Blade About Page</h1>
    <p>This is a normal Laravel Blade page.</p>
    <h2>Users List:</h2>
    <ul>
        @foreach($users as $user)
            <li>{{ $user }}</li>
        @endforeach
    </ul>

    <a href="/blade-contact">Go to Contact (Blade)</a>
</body>
</html>
