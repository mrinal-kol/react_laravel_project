<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ValidUser
{
    public function handle(Request $request, Closure $next): Response
    {
        // ✅ Allow local environment (XAMPP, localhost)
        if (app()->environment('local')) {
            return $next($request);
        }

        $ip = $request->ip();

        // ✅ Get country code
        $country = @trim(file_get_contents("https://ipapi.co/{$ip}/country/"));

        // ✅ Allow only India
        if ($country !== 'IN') {
            return response('Access allowed only from India', 403);
        }

        return $next($request);
    }
}
