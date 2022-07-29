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
import type { ILayoverModalPopUp } from '../../interfaces/ILayoverModalPopUp'
import styles from './styles.css'

export const Layover: ComponentWithSchema<ILayoverModalPopUp> = ({
  entityMd,
  paragraphFirst,
  paragraphSecond,
  paragraphMsgSuccess,
  layoverImg,
  layoverImgDesktop,
  linkPrivacyPolicy,
  linkCookiesPolicy,
  btnBackground,
  btnColorText,
}): JSX.Element => {
  const [userName, setUserName] = useState('')
  const [emailValue, setEmailValue] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isRegistered, setIsRegistered] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [checkboxPromotion, setCheckboxPromotion] = useState<string[]>([])
  const [selectedGenre, setSelectedGenre] = useState<'masculino' | 'feminino'>(
    'masculino'
  )

  const { isMobile } = useDevice()

  const text01 = 'Inscreva-se na newsletter'

  const text02 =
    'Assine nossa newsletter para ganhar frete grátis em sua primeira compra.'

  const text03 = 'Assinado com sucesso!'

  const loadItems = useCallback(() => {
    const body = {
      name: userName,
      email: emailValue,
      genre: selectedGenre,
      promotions: checkboxPromotion,
      layoverType: 'informative',
    }

    const requestParams: RequestParams = {
      url: `/api/dataentities/${entityMd}/documents`,
      body,
    }

    httpPostClient(requestParams)
  }, [entityMd, userName, emailValue, selectedGenre, checkboxPromotion])

  const handleSubmit = useCallback(() => {
    setIsLoading(true)

    if (!userName || !emailValue) {
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
  }, [userName, emailValue, loadItems, selectedGenre])

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
                {paragraphFirst ?? text01}
              </p>
              <CloseButton />
            </div>

            <p className={styles.layoverSecondText}>
              {paragraphSecond ?? text02}
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
                type="text"
                placeholder="Seu nome"
                onChangeText={setUserName}
                value={userName}
                className={styles.layoverSecondInput}
              />

              <LayoverInput
                type="email"
                placeholder="Insira aqui seu e-mail"
                onChangeText={setEmailValue}
                value={emailValue}
                className={styles.layoverInput}
              />
            </div>
            <span className={styles.textMandatoryFields}>
              *Campos obrigatórios
            </span>
          </section>

          <section className={styles.layoverCheckboxOptions}>
            <LayoverCheckbox
              options={['Li e concordo com as política de privacidades']}
              value={checkboxPromotion}
              setValue={setCheckboxPromotion}
            />
          </section>

          <section className={styles.layoverInfoTextContent}>
            <p className={styles.layoverFirstInfoText}>
              Pretendo receber novidades e promoções de acordo com o meu perfil
              e a minha personalidade.
              <a
                href={linkCookiesPolicy}
                className={styles.layoverSecondInfoText}
              >
                Politica de privacidade.
              </a>{' '}
              e{' '}
              <a
                className={styles.layoverSecondInfoText}
                href={linkPrivacyPolicy}
              >
                Politica de cookies
              </a>
            </p>
          </section>

          <button
            type="button"
            className={styles.layoverButton}
            onClick={handleSubmit}
            style={{ backgroundColor: btnBackground }}
          >
            <p style={{ color: btnColorText }}>
              {isLoading ? '. . .' : 'Enviar'}
            </p>
          </button>
        </div>
      ) : (
        <div className={styles.successLayoverScreen}>
          <div className={styles.layoverTextContainer}>
            <h2 className={styles.paragraphMsgSuccess}>
              {paragraphMsgSuccess ?? text03}
            </h2>
            <p className={styles.layoverSecondText}>
              lorem ipsum dolor sit amet, consectetur adipiscing, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.
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
    entityMd: {
      type: 'string',
      title: 'Entidade do Master Data',
    },
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
    linkPrivacyPolicy: {
      type: 'string',
      title: 'Link para política de privacidade',
    },
    linkCookiesPolicy: {
      type: 'string',
      title: 'Link para política de cookies',
    },
    btnBackground: {
      type: 'string',
      title: 'Cor de fundo do botão',
    },
    btnColorText: {
      type: 'string',
      title: 'Cor do texto do botão',
    },
  },
}
