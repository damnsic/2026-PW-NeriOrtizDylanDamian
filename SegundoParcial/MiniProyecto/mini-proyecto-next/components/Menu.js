import Link from 'next/link'

export default function Menu(){
    return (
        <nav>
            <Link href="/" >Inicio</Link>
            <Link href="/mini-servidor" >MiPrimerProyecto</Link>
            <Link href="/practica/1" >Pagina2</Link>
        </nav>
    );
}