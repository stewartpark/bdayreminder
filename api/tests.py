from django.test import TestCase

from .tasks import add


class BDayTest(TestCase):
    def test_dummy(self):
        self.assertEqual(add(1,1), 2)
