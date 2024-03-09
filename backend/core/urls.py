from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from . import views

from .views import UserRegistrationView, UserLoginView, UserProfileView, opencam


urlpatterns = [
    path("api/register/", view=UserRegistrationView.as_view(), name="Create User"),
    path("api/login/", view=UserLoginView.as_view(), name="User Login"),
    path('api/users/me/', UserProfileView.as_view()),
    path("api/jwt/refresh/", jwt_views.TokenRefreshView.as_view()),

    path('api/token/', jwt_views.TokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(),
         name='token_refresh'),

    path("api/opencam/", opencam, name="opencam"),
]
