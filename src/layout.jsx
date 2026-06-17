import Header from "./component/header";
import Modal from "./component/modal";
import Footer from "./component/footer";



export default function Layout({children}) {

    return (
        <>
            <Header  />
            <Modal/>
          {children}
          <Footer/>
        </>
    )


}


