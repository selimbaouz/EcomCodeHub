import EmailVerification from "@/emails/EmailVerification";
import { Suspense } from "react";

export default function DemoEmail () {
  return (
    <Suspense>
      <div className="mx-auto w-full flex justify-center">
        <EmailVerification token=""/>
      </div>
    </Suspense>
  );
}
