import { useNavigate } from 'react-router-dom'
import { RiShutDownLine } from 'react-icons/ri'

import { Container, Profile, Logout } from './styles'
import avatarPlaceholder from '../../assets/avatar_placeholder.svg'

import { useAuth } from '../../hooks/auth'
import { api } from '../../services/api'

export function Header() {
  const navigate = useNavigate()

  function handleSignOut() {
    navigate('/')
    signOut()
  }

  const { signOut, user } = useAuth()

  const avatarUrl = user.avatar
    ? `${api.defaults.baseURL}/files/${user.avatar}`
    : avatarPlaceholder

  return (
    <Container>
      <Profile to="/profile">
        <img src={avatarUrl} alt="user photo" />
        <div>
          <span>Bem vindo(a),</span>
          <strong>{user.name}</strong>
        </div>
      </Profile>

      <Logout onClick={handleSignOut}>
        <RiShutDownLine />
      </Logout>
    </Container>
  )
}
