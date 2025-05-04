import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex h-screen">
      {/*<Sidebar { ...currentUser } />*/}

      <section className="flex h-full flex-1 flex-col">
        {/*<MobileNavigation { ...currentUser } />*/}
        {/*<Header userId={ currentUser.$id } accountId={ currentUser.accountId } />*/}
        <div className="main-content">{children}</div>
      </section>

      {/*<Toaster />*/}
    </main>
  );
};
export default Layout;
