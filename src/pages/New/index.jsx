import { useEffect, useState } from 'react'

import { api } from '../../services/api'
import { useNavigate } from 'react-router-dom'

import { Container, Form } from './styles'
import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { TextArea } from '../../components/TextArea'
import { NoteItem } from '../../components/NoteItem'
import { Section } from '../../components/Section'
import { Button } from '../../components/Button'
import { ButtonText } from '../../components/ButtonText'

export function New() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const [links, setLinks] = useState([])
  const [newLink, setNewLink] = useState('')

  const [tags, setTags] = useState([])
  const [newTag, setNewTag] = useState('')

  const [isDisabled, setIsDisabled] = useState(true)

  const navigate = useNavigate()

  function handleBack() {
    navigate(-1)
  }

  function handleAddLink() {
    setLinks((prevState) => [...prevState, newLink])
    setNewLink('')
  }

  function handleRemoveLink(deleted) {
    setLinks((prevState) => prevState.filter((link) => link !== deleted))
  }

  function handleAddTag() {
    setTags((prevState) => [...prevState, newTag])
    setNewTag('')
  }

  function handleRemoveTag(deleted) {
    setTags((prevState) => prevState.filter((tag) => tag !== deleted))
  }

  async function handleNewNote() {
    if (!title) {
      return alert('O campo Título não foi preenchido!')
    }
    if (!description) {
      return alert('O campo Observações não foi preenchido!')
    }

    if (newLink) {
      return alert(
        'Existe um link que não foi adicionado, por favor, clique em "+" para salvar.'
      )
    }
    if (newTag) {
      return alert(
        'Existe uma tag que não foi adicionada, por favor, clique em "+" para salvar.'
      )
    }
    await api.post('/notes', {
      title,
      description,
      links,
      tags
    })

    alert('Note criada com sucesso!')

    handleBack()
  }

  useEffect(() => {
    if (title && description) {
      setIsDisabled(false)
      return
    }
    setIsDisabled(true)
  }, [title, description])

  return (
    <Container>
      <Header />

      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
            <ButtonText title="Voltar" onClick={handleBack} />
          </header>

          <Input
            placeholder="Título"
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextArea
            placeholder="Observações"
            onChange={(e) => setDescription(e.target.value)}
          />

          <Section title="Links úteis">
            {links.map((link, index) => (
              <NoteItem
                key={String(index)}
                value={link}
                onClick={() => {
                  handleRemoveLink(link)
                }}
              />
            ))}

            <NoteItem
              placeholder="Novo link"
              isNew
              value={newLink}
              onChange={(e) => {
                setNewLink(e.target.value)
              }}
              onClick={handleAddLink}
            />
          </Section>
          <Section title="Marcadores">
            <div className="tags">
              {tags.map((tag, index) => (
                <NoteItem
                  key={String(index)}
                  value={tag}
                  onClick={() => {
                    handleRemoveTag(tag)
                  }}
                />
              ))}

              <NoteItem
                isNew
                placeholder="Novo marcador"
                value={newTag}
                onChange={(e) => {
                  setNewTag(e.target.value)
                }}
                onClick={handleAddTag}
              />
            </div>
          </Section>
          <Button
            title="Salvar"
            onClick={handleNewNote}
            disabled={isDisabled}
          />
        </Form>
      </main>
    </Container>
  )
}
