function PaymentMode(){
    return(
        <div className="container">
            <div className="card">
            <div className="card content">
                <div className="card">

                    <div className="card-content white text">

                        <h1 className="card-title" style={{fontWeight:"bold"}}>Payment Methods : </h1>
                        <br></br>
                        <div className="waves-effect waves-light btn"><i className="material-icons left"></i>Google Pay</div>
                        <br></br>
                        <br></br>
                        <div className="waves-effect waves-light btn"><i className="material-icons left"></i>Masterpass</div>
                        <br></br>
                        <br></br>
                        <span className="card-title" style={{fontWeight:"bold"}}>Enter Card Details Below : </span>
                        <br></br>

                        <label htmlFor="pin"></label>MM/YY CVV
                        <div className="input-field"><input id = "pin" type="text"/></div>

                        <label htmlFor="Name"></label>Name
                        <div className="input-field"><input id = "Name" type="text"/></div>

                        <label htmlFor="zip"></label>Zip
                        <div className="input-field"><input id = "zip" type="text"/></div>

                        <div className="waves-effect waves-light btn">Pay</div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default PaymentMode;