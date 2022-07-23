import React, { useCallback, useState } from 'react'
import { CloseButton } from 'vtex.modal-layout'
import { useDevice } from 'vtex.device-detector'

import { LayoverImg } from './components/LayoverImg'
import { LayoverInput } from './components/LayoverInput'
import { LayoverRadio } from './components/LayoverRadio'
import { LayoverCheckbox } from './components/LayoverCheckbox'
import { validateEmail } from '../../utils/validateEmail'
import httpPostClient from '../../services/httpPostClient'
import type { RequestParams } from '../../services/httpPostClient'
import type { ComponentWithSchema } from '../../interfaces/ComponentWithSchema'
import styles from './styles.css'

interface ILayoverCupom {
  paragraphFirst?: string
  paragraphSecond?: string
  paragraphMsgSuccess?: string
  layoverImg?: string
  layoverImgDesktop?: string
}

export const Layover: ComponentWithSchema<ILayoverCupom> = ({
  paragraphFirst,
  paragraphSecond,
  paragraphMsgSuccess,
  layoverImg,
  layoverImgDesktop,
}): JSX.Element => {
  const [dateValue, setDateValue] = useState('')
  const [emailValue, setEmailValue] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isRegistered, setIsRegistered] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [checkboxPromotion, setCheckboxPromotion] = useState<string[]>([])
  const [selectedGenre, setSelectedGenre] = useState<'masculino' | 'feminino'>(
    'masculino'
  )

  const { isMobile } = useDevice()

  const loadItems = useCallback(() => {
    const body = {
      date: dateValue,
      email: emailValue,
      genre: selectedGenre,
      layoverType: 'informative',
    }

    const requestParams: RequestParams = {
      url: '/api/dataentities/ML/documents',
      body,
    }

    httpPostClient(requestParams)
  }, [emailValue, dateValue, selectedGenre])

  const handleSubmit = useCallback(() => {
    setIsLoading(true)

    if (!dateValue || !emailValue) {
      setErrorMessage('Preencha os campos')
      setIsLoading(false)

      return
    }

    if (!validateEmail(emailValue)) {
      setErrorMessage('E-mail inválido!')
      setIsLoading(false)

      return
    }

    if (!selectedGenre) {
      setErrorMessage('Escolha um gênero!')
      setIsLoading(false)

      return
    }

    setErrorMessage('')
    setIsLoading(false)
    setIsRegistered(true)
    loadItems()
  }, [dateValue, emailValue, loadItems, selectedGenre])

  const text1 = 'Inscreva-se na newsletter'
  const text2 =
    'Coloque o seu e-mail para ganhar frete grátis em sua primeira compra, descobrir os lançamentos e manter-se atualizado das nossas promoções.'

  const text3 = 'Assinado com sucesso'

  return (
    <aside className={styles.layoverContainer}>
      <section className={styles.layoverImg}>
        {isMobile ? (
          <LayoverImg
            className={styles.layoverImgMobile}
            alt="Layover Img"
            imageName={layoverImg}
          />
        ) : (
          <LayoverImg
            className={styles.layoverImgDesktop}
            alt="Layover Img Desktop"
            imageName={layoverImgDesktop}
          />
        )}
      </section>

      {!isRegistered ? (
        <div className={styles.layoverForm}>
          <section className={styles.layoverTextContainer}>
            <div className={styles.layoverHeadModal}>
              <p className={styles.layoverFirstText}>
                {paragraphFirst ?? text1}
              </p>
              <CloseButton />
            </div>

            <p className={styles.layoverSecondText}>
              {paragraphSecond ?? text2}
            </p>

            {errorMessage && (
              <span className={styles.layoverErrorMessage}>{errorMessage}</span>
            )}
          </section>

          <section className={styles.layoverRadioGenres}>
            <LayoverRadio
              options={['masculino', 'feminino']}
              value={selectedGenre}
              setValue={setSelectedGenre}
            />
          </section>

          <section className={styles.layoverInputContainer}>
            <div className={styles.layoverInputs}>
              <LayoverInput
                type="email"
                placeholder="Insira aqui seu e-mail"
                onChangeText={setEmailValue}
                value={emailValue}
                className={styles.layoverInput}
              />

              <LayoverInput
                type="date"
                placeholder="Data de nascimento"
                onChangeText={setDateValue}
                value={dateValue}
                className={styles.layoverSecondInput}
              />
            </div>
            <span className={styles.textMandatoryFields}>
              *Campos obrigatórios
            </span>
          </section>

          <section className={styles.layoverCheckboxOptions}>
            <LayoverCheckbox
              options={[
                'Permissão para finalidades de marketing direto',
                'Permissão para finalidades de qualificação.',
                'Permissão para cessão de dados a terceiros para finalidades de marketing.',
              ]}
              value={checkboxPromotion}
              setValue={setCheckboxPromotion}
            />
          </section>

          <section className={styles.layoverInfoTextContent}>
            <p className={styles.layoverFirstInfoText}>
              Pretendo receber novidades e promoções de acordo com o meu perfil
              e a minha personalidade.
              <a
                href="https://www.google.com/policies/privacy/"
                className={styles.layoverSecondInfoText}
              >
                Politica de privacidade.
              </a>{' '}
              e{' '}
              <a className={styles.layoverSecondInfoText} href="/#">
                Politica de cookies
              </a>
            </p>
          </section>

          <button
            type="button"
            className={styles.layoverButton}
            onClick={handleSubmit}
          >
            <p>{isLoading ? '. . .' : 'Enviar'}</p>
          </button>
        </div>
      ) : (
        <div className={styles.successLayoverScreen}>
          <div className={styles.layoverTextContainer}>
            <p className={styles.paragraphMsgSuccess}>
              {paragraphMsgSuccess ?? text3}
            </p>
          </div>
        </div>
      )}
    </aside>
  )
}

Layover.schema = {
  type: 'object',
  name: 'Modal Layover',
  title: 'Modal Layover',
  properties: {
    paragraphFirst: {
      type: 'string',
      title: 'Texto de cadastro 1',
    },
    paragraphSecond: {
      type: 'string',
      title: 'Texto de cadastro 2',
    },
    paragraphMsgSuccess: {
      type: 'string',
      title: 'Texto de mensagem de sucesso',
    },
    layoverImg: {
      type: 'string',
      title: 'Imagem do Layover - mobile',
      widget: {
        'ui:widget': 'image-uploader',
      },
    },
    layoverImgDesktop: {
      type: 'string',
      title: 'Imagem do Layover - desktop',
      widget: {
        'ui:widget': 'image-uploader',
      },
    },
  },
}
