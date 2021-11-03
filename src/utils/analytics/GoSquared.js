import React, {useEffect} from "react";
import {Helmet} from "react-helmet";
import {useLocation} from "react-router-dom";
import {useMsal} from "@azure/msal-react";

const GOSQUARED_GSN = process.env.REACT_APP_GOSQUARED;

const GoSquared = () => {
    const location = useLocation();
    const { instance } = useMsal();

    useEffect(() => _gs('track'), [location]);

    const activeAccount = instance.getActiveAccount();
    useEffect(() => {
        if (activeAccount) {
            _gs('identify', {email: activeAccount.username, name: activeAccount.name});
        } else {
            _gs('unidentify');
        }
    }, [activeAccount]);

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

export const _gs = (...args) => {
    if (window._gs) {
        window._gs(...args);
    }
}

export default GoSquared;