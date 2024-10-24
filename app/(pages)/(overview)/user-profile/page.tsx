import EmptyState from 'shared/ui/EmptyState'
import UserPropertiesPage from './UserPropertiesPage'
import {
    getCurrentUser,
    getListingsUserId,
} from 'shared/services/server-actions'

const UserProfilePage = async () => {
    const currentUser = await getCurrentUser()

    // if (!currentUser) {
    //     return (
    //         <EmptyState title="Не авторизован" subtitle="Пожалуйста войдите" />
    //     )
    // }

    // const listings = await getListingsUserId(currentUser.id)

    // if (!listings.length) {
    //     return <EmptyState title="Нет  квартир" />
    // }

    return (<UserPropertiesPage currentUser={currentUser}/>)

}

export default UserProfilePage
