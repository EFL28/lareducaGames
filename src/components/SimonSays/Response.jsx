import React from "react";

const Response = ({ response }) => {
    return (
        <div className="border border-black rounded m-8 p-4 text-center">
            {response}
        </div>
    );
};

export default Response;