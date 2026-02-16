export function Footer() {
  return (
    <footer className="py-6 text-center text-sm text-muted-foreground">
      <div className="container mx-auto">
        &copy; {new Date().getFullYear()} Bastar Marathon. All rights reserved.
      </div>
    </footer>
  );
}
