import s from './s.module.scss'
import Logo from '@/shared/assets/logo.svg'
import { Container } from '@/shared/ui/SizesContainer'
import { FooterLink } from './FooterLink'
import { cn } from '@/shared/utils/cn'

const Footer = () => {
    return (
        <footer className={cn(s.footer, 'border-2 dark:bg-black')}>
            <Container className={s.info}>
                <Logo className={s.logo} />
                <div className={s['left-info']}>
                    <div className={cn(s.sublogo, 'leading-normal')}>
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
                    <FooterLink href="/offer">Условия предоставления услуг</FooterLink>
                    <FooterLink href="#">Получение товара после оплаты</FooterLink>
                    <FooterLink href="#">О компании</FooterLink>
                    <FooterLink href="#">Работа</FooterLink>
                </div>
            </Container>
        </footer>
    )
}
export default Footer
