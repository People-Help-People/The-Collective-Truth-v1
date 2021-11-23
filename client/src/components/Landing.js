import { useState } from "react";

export default function Landing() {
    const [cycle, setCycle] = useState(0);
    const nextCycle = () => {
        setCycle(cycle + 1);
    };

    const components = [
        (<button onClick={nextCycle}>
            Join the Space!
        </button>),
        (<>
            <button>Connect your metamask</button>
            <p> If you dont have one. Go and create one real quick. We dont care if it has money or not. Just create a dummy account. There is no fee nor shady stuff anyway!</p>
        </>)
    ]

    return (
        components[cycle]
    )

}