export default function Layout(props){

    const {children} = props
    const header = (
        <header>
            <h1 className="text-gradient">The Brogram</h1>
            <p><strong>The 30 Simple Workouts Program</strong></p>
        </header>
    )

    // href is probably https://www.YOUR_USERNAME.netlify.app
    const footer = (
        <footer>
            
            <p>Built by <a href="" target="_blank">RoyM</a><br />Styled with <a href="https://www.fantacss.smoljames.com" target="_blank">FantaCSS</a></p>
        </footer>
    )
    return(
        <>
            {header}
            {children}
            {footer}
        </>
    )
}