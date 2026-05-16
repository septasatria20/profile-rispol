<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Contact;

class CleanContacts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'contacts:clean';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Clean and normalize contact records (email/phone)';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $this->info('Scanning contacts...');

        $contacts = Contact::all();
        $fixed = 0;
        foreach ($contacts as $contact) {
            $changed = false;

            if (!empty($contact->email)) {
                $email = trim($contact->email);
                $lower = strtolower($email);
                if (strpos($lower, 'approval') !== false || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
                    $contact->email = null;
                    $changed = true;
                } else {
                    if ($contact->email !== $email) {
                        $contact->email = $email;
                        $changed = true;
                    }
                }
            }

            if (!empty($contact->phone)) {
                $digits = preg_replace('/\D+/', '', $contact->phone);
                if (strlen($digits) < 6) {
                    $contact->phone = null;
                    $changed = true;
                } else {
                    if ($contact->phone !== $digits) {
                        $contact->phone = $digits;
                        $changed = true;
                    }
                }
            }

            if ($changed) {
                $contact->save();
                $fixed++;
                $this->line("Fixed contact #{$contact->id}");
            }
        }

        $this->info("Completed. Fixed: {$fixed} contacts.");

        return 0;
    }
}
