import "./assets/styles/globals.css";

export const metadata = {
  title: "Lab04"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
