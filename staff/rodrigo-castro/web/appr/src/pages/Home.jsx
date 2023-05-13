import Posts from '../components/Posts'
import { retrieveUser } from '../logic/retrieveUser'
import { context } from '../ui'
import { useState } from 'react'
import AddPostModal from '../components/AddPostModal'
import ChangeEmail from '../components/ChangeEmail'
import ChangePassword from '../components/ChagePassword'
import ChangeAvatar from '../components/ChangeAvatar'
import EditPost from '../components/EditPost'
import Profile from '../components/Profile'
import './Home.css'
import PropTypes from 'prop-types'

export default function Home(props) {
    Home.propTypes = {
        onLogout: PropTypes.func
    }

    const [modal, setModal] = useState(null)
    const [postId, setPostId] = useState(null)
    const [lastPostsUpdate, setLastPostsUpdate] = useState(Date.now())

    let _user

    try{
        _user = retrieveUser(context.userId)
    } catch(error){
        alert(error.message)
    }

    const [user, setUser] = useState(_user)

    const handleCloseModal = () => setModal(null)
    
    const handleOpenAddPost = () => setModal('add-post')

    const handlePostsModified = () => {
        setModal(null)

        setLastPostsUpdate(Date.now)
    }

    const handleOpenProfile = () => setModal('profile')

    const handleOpenChangeEmail = () => setModal('change-email')

    const handleOpenChangePassword = () => setModal('change-password')

    const handleOpenChangeAvatar = () => setModal('change-avatar')

    const handleAvatarChanged = () => {
        try {
            const user = retrieveUser(context.userId)

            setModal(null)

            setUser(user)

            setLastPostsUpdate(Date.now())
        } catch(error){
            alert(error.message)
        }
    }

    const handleEditClicked = (id) => {
        setModal('edit-post')

        setPostId(id)
    }

    const handleLogout = (event) => {
        event.preventDefault()

        delete context.userId
        
        props.onLogout()
    }
    
    return <div className="home-page">
        <header>
            <div name="my-app"><a href="#"><i className="uil uil-scenery"></i><span></span></a></div>
            <nav>
                <ul className="horizontal-menu">
                    <li name="home"><a href="#" className="menu-buttons"><i className="uil uil-home"></i><span className="menu-text">Home</span></a></li>
                    <li name="new-post" onClick={handleOpenAddPost}><a href="#" className="menu-buttons"><i className="uil uil-camera-plus"></i><span className="menu-text">Post</span></a></li>
                    <li name="my-profile" onClick={handleOpenProfile}>
                        <img src={user.avatar || 'https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg'} alt="" className="user-avatar"/>
                        <a href="#" className="menu-buttons"><span className="menu-text" name="authenticated-user-name">Profile</span></a>
                    </li>
                    <li className="logout" name="logout" onClick={handleLogout}><a href="#" className="menu-buttons"><i className="uil uil-signout"></i><span className="menu-text">Logout</span></a></li>
                </ul>
            </nav>
        </header>
        <main className="main-content">
            <Posts onEditClicked={handleEditClicked} lastPostsUpdate={lastPostsUpdate}/>

            {modal === 'add-post' && <AddPostModal 
                onCancel={handleCloseModal}
                onPostCreated={handlePostsModified}
            />}

            {modal === 'profile' && <Profile 
                onCancel={handleCloseModal}
                onChangeEmail={handleOpenChangeEmail}
                onChangePassword={handleOpenChangePassword}
                onChangeAvatar={handleOpenChangeAvatar}
            />}

            {modal === 'change-email' && <ChangeEmail
                onCancel={handleCloseModal}
                onEmailChanged={handleCloseModal}
            />}

            {modal === 'change-password' && <ChangePassword
                onCancel={handleCloseModal}
                onPasswordChanged={handleCloseModal}
            />}

            {modal === 'change-avatar' && <ChangeAvatar
                onCancel={handleCloseModal}
                onAvatarChanged={handleAvatarChanged}
            />}

            {modal === 'edit-post' && <EditPost
                onCancel={handleCloseModal}
                onPostEdited={handlePostsModified}
                onPostDeleted={handlePostsModified}
                postId={postId}
            />}
        </main>
    </div>
}