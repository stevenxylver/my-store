import Link from "next/link";
import { useRouter } from "next/router"; // Importing useRouter from next/router
import Styles from "./Register.module.scss";
import { FormEvent, useState } from "react";

const RegisterView = () => {
  const  [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { push } = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // Fixed the syntax error here
    event.preventDefault();
    setIsLoading(true);
    setError('');
    const form = event.target as HTMLFormElement;
    const data = {
      email: form.email.value,
      fullname: form.fullname.value,
      phone: form.phone.value,
      password: form.password.value,
    };

    const result = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // Removed extra space before stringify
    });
    if (result.status === 200) {
      form.reset();
      setIsLoading(false);
      push("/auth/login");
    } else {
      setIsLoading(false);
      setError('email is already registered')
    }
  };

  return (
    <div className={Styles.register}>
      <h1 className={Styles.register_title}>Register</h1>
      {error && <p className={Styles.register_error}>{error}</p>}
      <div className={Styles.register_form}>
        <form onSubmit={handleSubmit}>
          <div className={Styles.register_form_item}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className={Styles.register_form_item_input}
            />
          </div>

          <div className={Styles.register_form_item}>
            <label htmlFor="fullname">Full Name</label>
            <input
              type="text"
              name="fullname"
              id="fullname"
              className={Styles.register_form_item_input}
            />
          </div>
          <div className={Styles.register_form_item}>
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              name="phone"
              id="phone"
              className={Styles.register_form_item_input}
            />
          </div>
          <div className={Styles.register_form_item}>
            <label htmlFor="password">Password</label>
            <input
              name="password"
              id="password"
              type="password"
              className={Styles.register_form_item_input}
            />
          </div>
          <button type="submit" className={Styles.register_form_button}>
            {isLoading ?'Loading...' : 'Register' }
          </button>
        </form>
      </div>
      <p className={Styles.register_link}>
        have an acccount? SignIn <Link href="/auth/login">here</Link>
      </p>
    </div>
  );
};

export default RegisterView;
