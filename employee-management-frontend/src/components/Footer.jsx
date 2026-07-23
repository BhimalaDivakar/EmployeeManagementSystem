function Footer() {
    return (
        <footer
            style={{
                marginTop: "60px",
                background: "rgba(15,23,42,.75)",
                backdropFilter: "blur(20px)",
                borderTop: "1px solid rgba(255,255,255,.08)",
                padding: "18px 0",
                textAlign: "center",
                color: "#cbd5e1"
            }}
        >
            <div className="container">

                <h6 className="mb-2 text-white">
                    Employee Management System
                </h6>

                <p className="mb-1">
                    Developed by <strong>Divakar B</strong>
                </p>

                <small>
                    © 2026 All Rights Reserved
                </small>

            </div>
        </footer>
    );
}

export default Footer;