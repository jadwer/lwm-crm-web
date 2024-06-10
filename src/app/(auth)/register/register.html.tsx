import Link from "next/link";
import { Button } from "react-bootstrap";

const RegisterTemplate = (props : any) => (


    <main>
               <form onSubmit={props.functions.submitForm}>
            {/* Name */}
            <div>
                <label htmlFor="name">Name</label>

                <input
                    id="name"
                    type="text"
                    value={props.data.name}
                    className="block mt-1 w-full"
                    onChange={event => props.functions.setName(event.target.value)}
                    required
                    autoFocus
                />

            </div>

            {/* Email Address */}
            <div className="mt-4">
                <label htmlFor="email">Email</label>

                <input
                    id="email"
                    type="email"
                    value={props.data.email}
                    className="block mt-1 w-full"
                    onChange={event => props.functions.setEmail(event.target.value)}
                    required
                />

            </div>

            {/* Password */}
            <div className="mt-4">
                <label htmlFor="password">Password</label>

                <input
                    id="password"
                    type="password"
                    value={props.data.password}
                    className="block mt-1 w-full"
                    onChange={event => props.functions.setPassword(event.target.value)}
                    required
                    autoComplete="new-password"
                />

            </div>

            {/* Confirm Password */}
            <div className="mt-4">
                <label htmlFor="passwordConfirmation">
                    Confirm Password
                </label>

                <input
                    id="passwordConfirmation"
                    type="password"
                    value={props.data.passwordConfirmation}
                    className="block mt-1 w-full"
                    onChange={event =>
                        props.functions.setPasswordConfirmation(event.target.value)
                    }
                    required
                />

            </div>

            <div className="flex items-center justify-end mt-4">
                <Link href="/login">
                    Already registered?
                </Link>

                <Button type="submit" className="ml-4">Register</Button>
            </div>
        </form>
    </main>


); export default RegisterTemplate;