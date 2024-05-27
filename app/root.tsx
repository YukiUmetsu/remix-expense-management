import { Link, useCatch } from "@remix-run/react";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";
import type { MetaFunction } from "remix";
import sharedStyles from "~/styles/shared.css";
import Error from './components/util/Error';

export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
};

const Document = ({title, children}: {title?: string, children: JSX.Element}) => {
    return(
        <html lang="en">
          <head>
            <meta charSet="utf-8" />
            {title ? <title>{title}</title>: <></>}
            <meta name="viewport" content="width=device-width,initial-scale=1" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap" rel="stylesheet" />
            <Meta />
            <Links />
          </head>
          <body>
            {children}
            <ScrollRestoration />
            <Scripts />
            <LiveReload />
          </body>
        </html>
      );
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export const links = () => {
  return [{ rel: "stylesheet", href: sharedStyles}]
}

export const CatchBoundary = () => {
  const caughtResponse = useCatch();

  return (
    <Document title={caughtResponse.statusText}>
      <main>
        <Error title={caughtResponse.statusText}>
          <p>{caughtResponse.data?.message || 'Something went wrong'}</p>
          <p>Back to <Link to="/">safety</Link>.</p>
        </Error>
      </main>
    </Document>
  )
}

export const ErrorBoundary = ({error}) => {
  return (
    <Document title="An error occurred">
      <main>
        <Error title="An error occurred">
          <p>
            {error.message || 'Something went wrong. Please try again later.'}
          </p>
          <p>
            Back to <Link to="/">safety</Link>.
          </p>
        </Error>
      </main>
    </Document>
  );
}