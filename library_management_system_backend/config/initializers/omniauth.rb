Rails.application.config.middleware.use ActionDispatch::Cookies
Rails.application.config.middleware.use ActionDispatch::Session::CookieStore
Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, ENV['GOOGLE_CLIENT_ID'], ENV['GOOGLE_CLIENT_SECRET'],
  {
    prompt: 'select_account',
    scope: 'email,profile',
    # access_type: 'online',
    access_type: 'offline',
    provider_ignores_state: true,
  }
end