import React from "react";
import Link from "next/link";
import { AlertCircle, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-surface-subtle text-night">
      <div className="max-w-md w-full p-8 rounded-2xl bg-white border border-surface-border shadow-card text-center space-y-6">
        <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 border border-red-200 flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-display font-bold text-night">
            Authentication Error
          </h1>
          <p className="text-sm text-night-muted leading-relaxed">
            There was a problem verifying your credentials or completing your authentication session.
          </p>
        </div>

        <div className="pt-2">
          <Link href="/login">
            <Button size="lg" className="w-full gap-2 font-bold shadow-sm">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Sign In</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
