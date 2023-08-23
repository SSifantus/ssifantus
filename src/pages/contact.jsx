import React, {useState} from 'react';
import PageBanner from "@components/PageBanner";
import Layouts from "@layouts/Layouts";
import appData from "@data/app.json";
import {Formik} from 'formik';

const Contact = () => {

  const [submitted, setSubmitted] = useState(false);

  return (
    <Layouts>
      <PageBanner pageTitle={""}/>
      <section className="app-section gap-top-140">
        <div className="container-md">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-5">

              {/* Heading */}
              <div className="app-text gap-bottom-30">
                <h2 className="section-title contact">Send A Message</h2>
              </div>

              {/* Form */}
              <div className="app-form">
                <Formik
                  initialValues={{email: '', name: '', tel: '', message: ''}}
                  validate={values => {
                    const errors = {};
                    if (!values.email) {
                      errors.email = 'Required';
                    } else if (
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                      errors.email = 'Invalid email address';
                    }
                    return errors;
                  }}
                  onSubmit={(values, {setSubmitting}) => {
                    const form = document.getElementById("contactForm");
                    const status = document.getElementById("contactFormStatus");
                    let data = new FormData();

                    data.append('name', values.name);
                    data.append('tel', values.tel);
                    data.append('email', values.email);
                    data.append('message', values.message);

                    fetch(form.action, {
                      method: 'POST',
                      body: data,
                      headers: {
                        'Accept': 'application/json'
                      }
                    }).then(response => {
                      if (response.ok) {
                        setSubmitted(true);
                        status.innerHTML = "Thanks for your message!";
                        form.reset();
                      } else {
                        response.json().then(data => {
                          if (Object.hasOwn(data, 'errors')) {
                            status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
                          } else {
                            status.innerHTML = "Oops! There was a problem submitting your form"
                          }
                        })
                      }
                    }).catch(error => {
                      status.innerHTML = "Oops! There was a problem submitting your form"
                    });

                    setSubmitting(false);
                  }}
                >
                  {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                      /* and other goodies */
                    }) => (
                    <form onSubmit={handleSubmit} id="contactForm" action={appData.settings.formspreeURL}
                          className="cform" method="post">
                      <div className={`row contact-form ${submitted ? 'submitted' : ''}`}>
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                          <p>
                            <input
                              placeholder="Name"
                              type="text"
                              name="name"
                              required="required"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.name}
                            />
                          </p>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                          <p>
                            <input
                              placeholder="Email Address"
                              type="email"
                              name="email"
                              required="required"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.email}
                            />
                          </p>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                          <p>
                            <input
                              placeholder="Phone"
                              type="tel"
                              name="tel"
                              required="required"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.tel}
                            />
                          </p>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                          <p>
                                            <textarea
                                              placeholder="Message"
                                              name="message"
                                              required="required"
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              value={values.message}
                                            />
                          </p>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                          <div className="g-recaptcha" data-sitekey="6LfuZ8AnAAAAAPBRguwJ6oz05_7Xbv2ErhyPc80E"></div>

                          <p>
                            <button type="submit" className="app-btn app-hover-btn">
                              <span>Send Message</span>
                            </button>
                          </p>
                        </div>
                      </div>

                      <div className="form-status alert-success" id="contactFormStatus"/>
                    </form>
                  )}
                </Formik>
              </div>

              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">


              </div>
            </div>
          </div>
        </div>
      </section>

    </Layouts>
  );
};
export default Contact;
