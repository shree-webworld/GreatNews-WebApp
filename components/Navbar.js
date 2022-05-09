import Link from 'next/link';

export default function Navbar()
{
  return (<>

    <nav className="navbar bg-blue-600 text-primary-content px-10  fixed top-0  z-50" style={{ fontFamily: "'Raleway', sans-serif" }}>
      <div className="flex-1">
        <Link href="/">
          <a className="btn btn-ghost font-bold text-3xl normal-case" >GreatNews24x7</a>
        </Link>
      </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal lg:menu-normal p-0 space-x-3">
            <li className="text-lg text-white hover:bg-[#ffff] hover:text-blue-700 hover:rounded-lg">
              <Link href="/">
                <a>HOME</a>
              </Link>
            </li>
            <li className="text-lg text-white hover:bg-white hover:text-blue-700 hover:rounded-lg ">
              <Link href="/inshorts_news">
                <a>INSHORTS NEWS</a>
              </Link>
            </li>
            <li className="text-lg text-white hover:bg-[#ffff] hover:text-blue-700 hover:rounded-lg">
              <Link href="/google_news">
                <a>GOOGLE NEWS</a>
              </Link>
            </li>
          </ul>
        </div>
    </nav>

        </>)
}
