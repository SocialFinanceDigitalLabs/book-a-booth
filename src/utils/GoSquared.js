import React, {useEffect} from "react";
import {Helmet} from "react-helmet";
import {useLocation} from "react-router-dom";

const GOSQUARED_GSN = process.env.REACT_APP_GOSQUARED;

const GoSquared = () => {
    const location = useLocation();
    useEffect(() => track(), [location]);
    if (GOSQUARED_GSN) {
        return (
            <Helmet>
                <script>
                    {`
                !function(g,s,q,r,d){r=g[r]=g[r]||function(){(r.q=r.q||[]).push(arguments)};
                d=s.createElement(q);d.src='//d1l6p2sc9645hc.cloudfront.net/gosquared.js';q=
                s.getElementsByTagName(q)[0];q.parentNode.insertBefore(d,q)}(window,document
                ,'script','_gs');

                _gs('${GOSQUARED_GSN}');
                _gs('set', 'anonymizeIP', true);
                _gs('track');
                `
                    }
                </script>
            </Helmet>
        )
    } else {
        return []
    }
}

export const track = () => {
    if (window._gs) {
        window._gs('track');
    }
}

export default GoSquared;