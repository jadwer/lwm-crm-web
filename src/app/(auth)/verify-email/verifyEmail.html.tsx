import { Button } from "react-bootstrap";

const VerifyEmailTemplate = (props : any) => (

    <main>
         <div className="mb-4 text-sm text-gray-600">
                Thanks for signing up! Before getting started, could you verify
                your email address by clicking on the link we just
                emailed to you? If you didn't receive the email, we will gladly
                send you another.
            </div>

            {props.data.status === 'verification-link-sent' && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    A new verification link has been sent to the email address
                    you provided during registration.
                </div>
            )}

            <div className="mt-4 flex items-center justify-between">
                <Button onClick={(event) => props.functions.resendEmailVerification( props.functions.setStatus )}>
                    Resend Verification Email
                </Button>

                <button
                    type="button"
                    className="underline text-sm text-gray-600 hover:text-gray-900"
                    onClick={props.functions.logout}>
                    Logout
                </button>
            </div>
    </main>

); export default VerifyEmailTemplate;