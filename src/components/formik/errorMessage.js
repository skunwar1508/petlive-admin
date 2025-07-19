import React from 'react'

export const ErrorMessage = (props) => {
  const { formik, name } = props;
  return (
    <>
      {formik?.touched?.[name] && formik.errors?.[name] ? (
        <div className="errorMsg">{formik.errors?.[name]}</div>
      ) : null}
    </>
  )
}
export const ErrorMessageOBJ = (props) => {
  const { formik, name, parent } = props;
  return (
    <>
      {formik?.touched?.[parent]?.[name] && formik.errors?.[parent]?.[name] ? (
        <div className="errorMsg">{formik.errors?.[parent]?.[name]}</div>
      ) : null}
    </>
  )
}
export const ErrorMessageARRAY = (props) => {
  const { formik, name, parent, index } = props;
  return (
    <>
      {/* {formik?.touched?.[parent] && formik.errors?.[parent] && (
        formik?.touched?.[parent][index] && formik.errors?.[parent][index] && (
          formik?.touched?.[parent][index]?.[name] && formik.errors?.[parent][index]?.[name] ? (
            <div className="errorMsg">{formik.errors?.[parent][index]?.[name]}</div>
          ) : (!formik?.touched?.[parent][index]?.[name] && !formik.errors?.[parent][index]?.[name] && (
            <div className="errorMsg">{formik.errors?.[parent][index]}</div>
          ))
        )
      )} */}
      {formik?.touched?.[parent] && formik.errors?.[parent] && (
        formik?.touched?.[parent][index] && formik.errors?.[parent][index] && (
          (formik?.touched?.[parent][index]?.[name] && formik.errors?.[parent][index]?.[name]) ? (
            <div className="errorMsg">{formik.errors?.[parent][index]?.[name]}</div>
          ) : (formik?.touched?.[parent][index] && formik.errors?.[parent][index] && (
            !name && <div className="errorMsg">{formik.errors?.[parent][index]}</div>
          ))
        )
      )}
    </>
  )
}
export const ErrorMessageARRAYOfARRAY = (props) => {
  const { formik, name, parent, index, childIndex } = props;
  return (
    <>
      {formik?.touched?.[parent] && formik.errors?.[parent] && (
        formik?.touched?.[parent][index] && formik.errors?.[parent][index] && (
          (formik?.touched?.[parent][index]?.[name] && formik.errors?.[parent][index]?.[name]) ? (
            formik?.touched?.[parent][index]?.[name]?.[childIndex] &&  formik.errors?.[parent][index]?.[name]?.[childIndex] && (
              <div className="errorMsg">{formik.errors?.[parent][index]?.[name]?.[childIndex]}</div>
            )
          ) : (formik?.touched?.[parent][index] && formik.errors?.[parent][index] && (
            !name && <div className="errorMsg">{formik.errors?.[parent][index]}</div>
          ))
        )
      )}
    </>
  )
}
export const ErrorMessageARRAYOfARRAYOBJ = ({formik, name, parent, index, childIndex, childName}) => {
  return (
    <>
      {formik?.touched?.[parent] && formik.errors?.[parent] && (
        formik?.touched?.[parent][index] && formik.errors?.[parent][index] && (
          (formik?.touched?.[parent][index]?.[name] && formik.errors?.[parent][index]?.[name]) ? (
            formik?.touched?.[parent][index]?.[name]?.[childIndex] && formik.errors?.[parent][index]?.[name]?.[childIndex] && (
              formik?.touched?.[parent][index]?.[name]?.[childIndex]?.[childName] && formik.errors?.[parent][index]?.[name]?.[childIndex]?.[childName] && (
                <div className="errorMsg">{formik.errors?.[parent][index]?.[name]?.[childIndex]?.[childName] }</div>
              ) 
            )
          ) : (formik?.touched?.[parent][index] && formik.errors?.[parent][index] && (
            !name && <div className="errorMsg">test</div>
          ))
        )
      )}
    </>
  )
}
export const ErrorMessageARRAYOfARRAYOBJarray = ({formik, name, parent, index, childIndex, childName, childOfchildIndex}) => {
  return (
    <>
      {formik?.touched?.[parent] && formik.errors?.[parent] && (
        formik?.touched?.[parent][index] && formik.errors?.[parent][index] && (
          (formik?.touched?.[parent][index]?.[name] && formik.errors?.[parent][index]?.[name]) ? (
            formik?.touched?.[parent][index]?.[name]?.[childIndex] && formik.errors?.[parent][index]?.[name]?.[childIndex] && (
              formik?.touched?.[parent][index]?.[name]?.[childIndex]?.[childName] && formik.errors?.[parent][index]?.[name]?.[childIndex]?.[childName] && (
                formik?.touched?.[parent][index]?.[name]?.[childIndex]?.[childName]?.[childOfchildIndex] && formik.errors?.[parent][index]?.[name]?.[childIndex]?.[childName]?.[childOfchildIndex] && (
                  <div className="errorMsg">{formik.errors?.[parent][index]?.[name]?.[childIndex]?.[childName]?.[childOfchildIndex] }</div>
                )
                
              ) 
            )
          ) : (formik?.touched?.[parent][index] && formik.errors?.[parent][index] && (
            !name && <div className="errorMsg">test</div>
          ))
        )
      )}
    </>
  )
}
export const ErrorMessageARRAYOfARRAYOBJarrayOBJ = ({formik, name, parent, index, childIndex, childName, childOfchildIndex, childOfchildName}) => {
  return (
    <>
      {formik?.touched?.[parent] && formik.errors?.[parent] && (
        formik?.touched?.[parent][index] && formik.errors?.[parent][index] && (
          (formik?.touched?.[parent][index]?.[name] && formik.errors?.[parent][index]?.[name]) ? (
            formik?.touched?.[parent][index]?.[name]?.[childIndex] && formik.errors?.[parent][index]?.[name]?.[childIndex] && (
              formik?.touched?.[parent][index]?.[name]?.[childIndex]?.[childName] && formik.errors?.[parent][index]?.[name]?.[childIndex]?.[childName] && (
                formik?.touched?.[parent][index]?.[name]?.[childIndex]?.[childName]?.[childOfchildIndex] && formik.errors?.[parent][index]?.[name]?.[childIndex]?.[childName]?.[childOfchildIndex] && (
                  formik?.touched?.[parent][index]?.[name]?.[childIndex]?.[childName]?.[childOfchildIndex]?.[childOfchildName] && formik.errors?.[parent][index]?.[name]?.[childIndex]?.[childName]?.[childOfchildIndex]?.[childOfchildName] && (
                    <div className="errorMsg">{formik.errors?.[parent][index]?.[name]?.[childIndex]?.[childName]?.[childOfchildIndex]?.[childOfchildName] }</div>
                  )
                )
                
              ) 
            )
          ) : (formik?.touched?.[parent][index] && formik.errors?.[parent][index] && (
            !name && <div className="errorMsg">test</div>
          ))
        )
      )}
    </>
  )
}
export const ErrorMessageARRAYOfARRAYOBJarrayOfArray = ({formik, name, parent, index, childIndex, childName, childOfchildIndex, childOfChildName, childOfchildOfChildIndex}) => {
  return (
    <>
      {formik?.touched?.[parent] && formik.errors?.[parent] && (
        formik?.touched?.[parent][index] && formik.errors?.[parent][index] && (
          (formik?.touched?.[parent][index]?.[name] && formik.errors?.[parent][index]?.[name]) ? (
            formik?.touched?.[parent][index]?.[name]?.[childIndex] && formik.errors?.[parent][index]?.[name]?.[childIndex] && (
              formik?.touched?.[parent][index]?.[name]?.[childIndex]?.[childName] && formik.errors?.[parent][index]?.[name]?.[childIndex]?.[childName] && (
                formik?.touched?.[parent][index]?.[name]?.[childIndex]?.[childName]?.[childOfchildIndex] && formik.errors?.[parent][index]?.[name]?.[childIndex]?.[childName]?.[childOfchildIndex] && (
                  formik?.touched?.[parent][index]?.[name]?.[childIndex]?.[childName]?.[childOfchildIndex]?.[childOfChildName] && formik.errors?.[parent][index]?.[name]?.[childIndex]?.[childName]?.[childOfchildIndex]?.[childOfChildName] && (
                    formik?.touched?.[parent][index]?.[name]?.[childIndex]?.[childName]?.[childOfchildIndex]?.[childOfChildName]?.[childOfchildOfChildIndex] && formik.errors?.[parent][index]?.[name]?.[childIndex]?.[childName]?.[childOfchildIndex]?.[childOfChildName]?.[childOfchildOfChildIndex] && (
                      <div className="errorMsg">{formik.errors?.[parent][index]?.[name]?.[childIndex]?.[childName]?.[childOfchildIndex]?.[childOfChildName]?.[childOfchildOfChildIndex] }</div>
                    )
                  )
                )
                
              ) 
            )
          ) : (formik?.touched?.[parent][index] && formik.errors?.[parent][index] && (
            !name && <div className="errorMsg">test</div>
          ))
        )
      )}
    </>
  )
}
export const ErrorMessageARRAYOfARRAYOBJarrayOfArrayOfArray = ({formik, name, parent, index, childIndex, childName, childOfchildIndex, childOfChildName, childOfchildOfChildIndex, childOfChildOfChildName, childOfchildOfChildOfChildIndex}) => {
  return (
    <>
      {formik?.touched?.[parent] && formik.errors?.[parent] && (
        formik?.touched?.[parent][index] && formik.errors?.[parent][index] && (
          (formik?.touched?.[parent][index]?.[name] && formik.errors?.[parent][index]?.[name]) ? (
            formik?.touched?.[parent][index]?.[name]?.[childIndex] && formik.errors?.[parent][index]?.[name]?.[childIndex] && (
              formik?.touched?.[parent][index]?.[name]?.[childIndex]?.[childName] && formik.errors?.[parent][index]?.[name]?.[childIndex]?.[childName] && (
                formik?.touched?.[parent][index]?.[name]?.[childIndex]?.[childName]?.[childOfchildIndex] && formik.errors?.[parent][index]?.[name]?.[childIndex]?.[childName]?.[childOfchildIndex] && (
                  formik?.touched?.[parent][index]?.[name]?.[childIndex]?.[childName]?.[childOfchildIndex]?.[childOfChildName] && formik.errors?.[parent][index]?.[name]?.[childIndex]?.[childName]?.[childOfchildIndex]?.[childOfChildName] && (
                    formik?.touched?.[parent][index]?.[name]?.[childIndex]?.[childName]?.[childOfchildIndex]?.[childOfChildName]?.[childOfchildOfChildIndex] && formik.errors?.[parent][index]?.[name]?.[childIndex]?.[childName]?.[childOfchildIndex]?.[childOfChildName]?.[childOfchildOfChildIndex] && (
                      formik?.touched?.[parent][index]?.[name]?.[childIndex]?.[childName]?.[childOfchildIndex]?.[childOfChildName]?.[childOfchildOfChildIndex]?.[childOfChildOfChildName]?.[childOfchildOfChildOfChildIndex] && formik.errors?.[parent][index]?.[name]?.[childIndex]?.[childName]?.[childOfchildIndex]?.[childOfChildName]?.[childOfchildOfChildIndex]?.[childOfChildOfChildName]?.[childOfchildOfChildOfChildIndex] && (
                        <div className="errorMsg">{formik.errors?.[parent][index]?.[name]?.[childIndex]?.[childName]?.[childOfchildIndex]?.[childOfChildName]?.[childOfchildOfChildIndex]?.[childOfChildOfChildName]?.[childOfchildOfChildOfChildIndex] }</div>
                      )
                    )
                  )
                )
                
              ) 
            )
          ) : (formik?.touched?.[parent][index] && formik.errors?.[parent][index] && (
            !name && <div className="errorMsg">test</div>
          ))
        )
      )}
    </>
  )
}
/* export const ErrorMessageARRAY = (props) => {
  const {formik, name, parent, index} = props;
return (
  <>
    {formik?.touched?.[parent] && formik.errors?.[parent] && (
      formik?.touched?.[parent][index]&& formik.errors?.[parent][index] && (
        formik?.touched?.[parent][index]?.[name] && formik.errors?.[parent][index]?.[name] ? (
            <div className="errorMsg">{formik.errors?.[parent][index]?.[name]}</div>
        ) : null
      )
    )}
  </>
)
} */