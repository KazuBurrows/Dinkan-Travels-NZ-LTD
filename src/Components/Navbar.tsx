type NavItem = {
  label: string;
  value: string;
};

const navItems: NavItem[] = [
  { label: "Home", value: "/" },
  { label: "Booking", value: "/booking" },
  { label: "Contact", value: "/contact" },
];

function Navbar() {
  return (
    <nav className="fixed top-2 left-1/2 transform -translate-x-1/2 z-50 w-max">
      <ul className="flex bg-[#ffd500] bg-opacity-60 rounded-full shadow-md overflow-hidden">
        {navItems.map((item) => (
          <li key={item.label}>
            <a
              className="px-6 leading-[48px] text-2xl font-bold text-white uppercase transition-colors hover:bg-gray-100"
              href={item.value}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
