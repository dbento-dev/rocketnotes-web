import { useEffect, useState } from 'react'

import { FiPlus, FiSearch } from 'react-icons/fi'
import { Container, Brand, Menu, Search, Content, NewNote } from './styles'

import { Header } from '../../components/Header'
import { ButtonText } from '../../components/ButtonText'
import { Input } from '../../components/Input'
import { Section } from '../../components/Section'
import { Note } from '../../components/Note'
import { api } from '../../services/api'

import { useNavigate } from 'react-router-dom'

export function Home() {
  const [tags, setTags] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const [search, setSearch] = useState('')
  const [notes, setNotes] = useState([])

  const navigate = useNavigate()
  function handleSelectedTag(tagName) {
    if (tagName === 'all') {
      setSelectedTags([])
      return
    }

    const alreadySelected = selectedTags.includes(tagName)

    if (alreadySelected) {
      const filteredTags = selectedTags.filter((tag) => tag !== tagName)

      setSelectedTags(filteredTags)
    } else {
      setSelectedTags((prevState) => [...prevState, tagName])
    }
  }

  function handleDetails(noteId) {
    navigate(`/details/${noteId}`)
  }

  useEffect(() => {
    async function getTags() {
      const response = await api.get('/tags')

      setTags(response.data)
    }

    getTags()
  }, [])

  useEffect(() => {
    async function getNotes() {
      const response = await api.get(
        `/notes?title=${search}&tags=${selectedTags}`
      )

      setNotes(response.data)
    }
    getNotes()
  }, [selectedTags, search])

  return (
    <>
      <Container>
        <Brand>
          <h1>Rocketnotes</h1>
        </Brand>
        <Header />

        <Menu>
          <li>
            <ButtonText
              title="Todos"
              onClick={() => handleSelectedTag('all')}
              isActive={selectedTags.length === 0}
            />
          </li>
          {tags &&
            tags.map((tag) => (
              <li key={String(tag.id)}>
                <ButtonText
                  title={tag.name}
                  onClick={() => handleSelectedTag(tag.name)}
                  isActive={selectedTags.includes(tag.name)}
                />
              </li>
            ))}
        </Menu>

        <Search>
          <Input
            placeholder="Pesquisar pelo título"
            icon={FiSearch}
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </Search>

        <Content>
          <Section title="Minhas notas">
            {notes &&
              notes.map((note) => (
                <Note
                  key={String(note.id)}
                  data={note}
                  onClick={() => {
                    handleDetails(note.id)
                  }}
                />
              ))}
          </Section>
        </Content>

        <NewNote to="/new">
          <FiPlus /> Criar nota
        </NewNote>
      </Container>
    </>
  )
}
