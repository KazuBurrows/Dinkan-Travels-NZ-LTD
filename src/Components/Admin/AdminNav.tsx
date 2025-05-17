type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: "Home", href: "/admin" },
  // { label: "Profile", href: "/profile" },
  // {
  //   label: "Settings",
  //   href: "/settings",
  // },
];

const AdminNav = () => {
  return (
    <nav className="w-80 h-screen bg-gray-800 text-white p-4 flex flex-col">
      <h1 className="text-xl font-bold mb-6">Admin Center</h1>
      <ul className="space-y-4">
        {navItems.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded transition-colors"
            >
              <span>{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default AdminNav;
