import s from './s.module.scss'
import Logo from '@/shared/assets/logo.svg'
import { Container } from '@/shared/ui/SizesContainer'
import Link from 'next/link'

const Footer = () => {
    return (
        <footer className={`${s.footer} border-2 dark:bg-black`}>
            <Container className={s.info}>
                <div className={s['left-info']}>
                    <Logo className={s.logo} />
                    <div className={`${s.sublogo} leading-normal`}>
                        <p>
                            <span>Imperator Of Dwelling</span>
                        </p>
                        <p>info@imperatorofdwelling.com.</p>
                        <p> ИП Емелёв Максим Андреевич.</p>
                        <p>ИНН: 026827929603.</p>
                        <p>ОГРН/ОГРНИП: 321028000086530.</p>
                    </div>
                </div>
                <div className={s['right-info']}>
                    <Link href="/offer">Условия предоставления услуг</Link>
                    <a href="#">Получение товара после оплаты</a>
                    <a href="#">О компании</a>
                    <a href="#">Работа</a>
                </div>
            </Container>
        </footer>
    )
}
export default Footer
