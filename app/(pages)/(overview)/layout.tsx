import { type ILayout } from 'shared/types'
import { Header } from 'shared/ui/Header'
import Footer from 'shared/ui/Footer'


export default function OverviewLayout({ children }: ILayout) {
    return (
        <div>
            {/* <Header /> */}
                <div className="relative">{children}</div>
            {/* <Footer /> */}
        </div>
    )
}
