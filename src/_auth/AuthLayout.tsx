import {Outlet, Navigate} from 'react-router-dom'

const AuthLayout = () => {
    const isAuthenticated = false;


    return (
        <>
            {isAuthenticated ? (
                <Navigate to="/" replace />
            ) : (
                <>
                    <section className='flex flex-1 justify-center items-center flex-col py-10'>
                        <Outlet/>
                    </section>

                    <img
                        src='/assets/images/imageAuth.jpg'
                        alt='logo'
                        className='hiddem xl:block h-screen w-1/2 object-cover bg-no-repeat'
                    /> 
                </>
            )}
        </>
    )
}

export default AuthLayout
