import Navbar from "./Navbar";
// the entire layout of the dapp is structured from this component
const Layout = ({ children }) => {
  return (
    <section className="h-screen flex flex-col justify-start">
      <Navbar suppressHydrationWarning={true} />
      <section
        className="bg-[#ffffff] flex-1 p-4 text-[#F9F5F6] border border-dashed "
        suppressHydrationWarning={true}
      >
        {children}
      </section>
    </section>
  );
};
export default Layout;
