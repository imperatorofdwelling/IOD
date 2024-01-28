import { User } from '@prisma/client'
import Container from '../Container'
import Search from '../Search'
import UserMenu from '../UserMenu'
import Logo from './Logo'

interface INavbar {
  currentUser?: User | null
}

const Navbar: React.FC<INavbar> = ({ currentUser }) => {
  console.log({ currentUser })
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu />
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Navbar
