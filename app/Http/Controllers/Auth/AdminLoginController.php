<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminLoginController extends Controller
{
    public function showLoginForm()
    {
        $firstNumber = random_int(1, 9);
        $secondNumber = random_int(1, 9);

        session(['admin_login_captcha' => $firstNumber + $secondNumber]);

        return Inertia::render('Admin/Login', [
            'captcha' => [
                'firstNumber' => $firstNumber,
                'secondNumber' => $secondNumber,
            ],
        ]);
    }

    public function login(Request $request)
    {
        $validated = $request->validate([
            'username' => ['required', 'string', 'max:50', 'regex:/^[A-Za-z0-9_]+$/'],
            'password' => ['required', 'string', 'max:255'],
            'captcha_answer' => ['required', 'integer'],
        ]);

        $expectedCaptcha = (int) $request->session()->get('admin_login_captcha', -1);
        if ((int) $validated['captcha_answer'] !== $expectedCaptcha) {
            return back()->withErrors([
                'captcha_answer' => 'Jawaban captcha salah.',
            ])->onlyInput('username');
        }

        $credentials = [
            'username' => $validated['username'],
            'password' => $validated['password'],
        ];

        if (Auth::guard('admin')->attempt($credentials, $request->filled('remember'))) {
            $request->session()->regenerate();
            $request->session()->forget('admin_login_captcha');

            return redirect()->intended('/admin/dashboard')->with('success', 'Login berhasil. Selamat datang kembali.');
        }

        return back()->withErrors([
            'username' => 'Username atau password salah.',
        ])->onlyInput('username');
    }

    public function logout(Request $request)
    {
        Auth::guard('admin')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/admin/login')->with('success', 'Logout berhasil.');
    }
}
