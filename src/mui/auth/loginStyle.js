export const Lstyles = {
    bgCover: {
        background:
            'linear-gradient(135deg, rgb(60, 163, 219) 0%, rgba(46, 0, 49, 0.75) 100%)',
        width: '100vw',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
    },
    container: {
        maxWidth: '65%',
        width: '100%',
        backgroundColor: 'white',
        display: 'flex',
        position: 'relative',
        boxShadow: '-6px 15px 106px 6px rgba(0,0,0,0.46)',
        paddingBottom: '5%',
    },
    '@media screen and (min-width: 992px) and (max-width: 1024px)': {
        container: {
            maxWidth: '80%',
            width: '100%',
            height: '60%',
            display: 'flex',
            position: 'relative',
            boxShadow: '-6px 15px 106px 6px rgba(0,0,0,0.46)',
            textAlign: 'center',
        },
    },
    login: {
        width: '50%',
        height: '100%',
        flex: 1,
    },
    leftContainer: {
        flex: 1,
        position: 'absolute',
        zIndex: 1,
        width: '50%',
        height: '100%',
        textAlign: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundImage:
            "url('https://www.cleany.fr/wp-content/uploads/2017/06/cleany-nettoyage-prestation-entretien.jpg')",
    },
    rightContainer: {
        flex: 1,
        zIndex: 1,
        marginLeft: '50%',
        width: '50%',
        height: '100%',
        backgroundColor: '#FFFFFF',
        textAlign: 'center',
    },
    filter: {
        background: 'linear-gradient(135deg,  #003d5a  0%,#bb6dec 100%)',
        opacity: '0.5',
        height: '100%',
        width: '100%',
        position: 'absolute',
        zIndex: 2,
    },
    '::selection': {
        color: 'red',
        backgroundColor: 'yeelow',
    },
    leftLabel: {
        position: 'absolute',
        zIndex: 3,
        color: 'white',
        fontFamily: 'Roboto',
        fontSize: 33,
        wordWrap: 'break-word',
        marginTop: 'calc(50% - 111px)',
    },
    title: {
        fontSize: 100,
    },
    login: {
        fontSize: 70,
        color: '#28374B',
    },
    rightContainerForm: {
        margin: '15%',
        width: '70%',
    },
    textField: {
        paddingTop: '12%',
        fontSize: 25,
    },
    button: {
        top: 34,
        backgroundColor: '#3ca3db',
        color: '#FFFFFF',
        width: '25%%',
        fontSize: '34x',
        left: 'calc(50% - 107px)',
    },
};

export const Mstyles = {
    bgCover: {
        background:
            'linear-gradient(135deg, rgb(60, 163, 219) 0%, rgba(46, 0, 49, 0.75) 100%)',
        width: '100vw',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
    },
    container: {
        textAlign: 'center',
        maxWidth: '100%',
        width: '100%',

        display: 'flex',
        position: 'relative',
        boxShadow: '-6px 15px 106px 6px rgba(0,0,0,0.46)',
    },
    login: {
        width: '50%',
        height: '100%',
        flex: 1,
    },
    leftContainer: {
        flex: 1,
        position: 'absolute',
        zIndex: 1,
        width: '50%',
        height: '100%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundImage:
            "url('https://www.cleany.fr/wp-content/uploads/2017/06/cleany-nettoyage-prestation-entretien.jpg')",
    },
    rightContainer: {
        flex: 1,
        zIndex: 1,
        marginLeft: '50%',
        width: '50%',
        height: '100%',
        backgroundColor: '#FFFFFF',
    },
    filter: {
        background: 'linear-gradient(135deg,  #003d5a  0%,#bb6dec 100%)',
        opacity: '0.5',
        height: '100%',
        width: '100%',
        position: 'absolute',
        zIndex: 2,
    },
    '::selection': {
        color: 'red',
        backgroundColor: 'yeelow',
    },
    leftLabel: {
        position: 'absolute',
        zIndex: 3,
        color: 'white',
        fontFamily: 'Roboto',
        fontSize: 24,
        wordWrap: 'break-word',
        margin: '10%',
    },
    leftLabelMedium: {
        position: 'absolute',
        zIndex: 3,
        color: 'white',
        fontFamily: 'Roboto',
        fontSize: 29,
        wordWrap: 'break-word',
        margin: '8%',
    },
    title: {
        fontSize: 100,
    },
    login: {
        fontSize: 70,
        color: '#28374B',
    },
    rightContainerForm: {
        margin: '15%',
        width: '70%',
    },
    textField: {
        paddingTop: '12%',
        fontSize: 25,
    },
    logo: {
        width: '50%',
    },
    button: {
        top: 34,
        backgroundColor: '#3ca3db',
        color: '#FFFFFF',
        width: '100%',
    },
    hintStyle: {
        fontSize: 20,
        color: '#909FB2',
    },
};

export const Sstyles = {
    bgCover: {
        background:
            'linear-gradient(135deg, rgb(60, 163, 219) 30%, rgb(51, 138, 186) 40%)',
        backgroundSize: 'cover',
        backgroundImage:
            "url('https://www.cleany.fr/wp-content/uploads/2017/06/cleany-nettoyage-prestation-entretien.jpg')",
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        position: 'fixed',
    },
    container: {
        maxWidth: '90%',
        width: '100%',
        display: 'flex',
        position: 'fixed',
        boxShadow: '-6px 15px 106px 6px rgba(0,0,0,0.46)',
        zIndex: '10',
    },
    login: {
        width: '50%',
        height: '100%',
        flex: 1,
    },
    leftContainer: {
        flex: 1,
        position: 'absolute',
        zIndex: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundImage:
            "url('https://www.cleany.fr/wp-content/uploads/2017/06/cleany-nettoyage-prestation-entretien.jpg')",
    },
    centeredContainer: {
        flex: 1,
        zIndex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFFFF',
        textAlign: 'center',
    },
    filter: {
        background:
            'linear-gradient(135deg, rgb(8, 16, 21) 0%, rgb(0, 165, 255) 100%)',
        opacity: '0.5',
        height: '100%',
        width: '100%',
        position: 'absolute',
        zIndex: 2,
    },
    '::selection': {
        color: 'red',
        backgroundColor: 'yeelow',
    },
    leftLabel: {
        position: 'absolute',
        zIndex: 3,
        color: 'white',
        fontFamily: 'Roboto',
        fontSize: 45,
        wordWrap: 'break-word',
        margin: '10%',
    },
    leftLabelMedium: {
        position: 'absolute',
        zIndex: 3,
        color: 'white',
        fontFamily: 'Roboto',
        fontSize: 29,
        wordWrap: 'break-word',
        margin: '8%',
    },
    title: {
        fontSize: 100,
    },
    login: {
        fontSize: 70,
        color: '#28374B',
    },
    rightContainerForm: {
        margin: '15% 10% 15% 10%',
        width: '80%',
    },
    textField: {
        paddingTop: '12%',
        fontSize: 18,
    },
    logo: {
        width: '50%',
        zIndex: '10',
    },
    button: {
        top: 34,
        backgroundColor: '#3ca3db',
        color: '#FFFFFF',
        width: '100%',
    },
    hintStyle: {
        fontSize: 20,
        color: '#909FB2',
    },
};
